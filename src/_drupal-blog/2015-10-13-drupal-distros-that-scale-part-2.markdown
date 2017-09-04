---
title: "Creating A Drupal Distro That Scales - Part 2: Site Deployment"
image: /files/2015-10-13-drupal-distros-that-scale-part-2/coding.gif
description: "So it's time for you to build your Drupal CMS. You install Drupal, generate your new site and log in. After checking off about forty-thousand config options, you're done. You have a site. Now launch your next dozen sites."
---

So it's time for you to build your take on Drupal. You install Drupal, generate your new site and log in. Time to check off what you want for your site. Clean URLs? Yes please. Overlay? No thanks. Download and install the views module? Of course. Alright, after this and about forty-thousand other changes, you're done. You have a blank site in your new CMS, powered by Drupal. Now launch your second site. Okay, **annoying**, but you'll do all the same clicks and get it done. Alright, done. You *probably* got all the settings the same. Now launch your next dozen sites this way.

![Many, many sites](/files/2015-10-13-drupal-distros-that-scale-part-2/coding.gif)

Okay, this needs to be automated. Badly.

I've spoken with some institutions that feel they're small enough to get by with manual site installs. They're crazy and wrong. It's at best a mind-numbing and excessive waste of resources as the team is reduced to repeating an assembly line of mouse clicks, and at worst that team is introducing different configurations across all sites that no one knows about, nor no one can reconcile. When we launch features to production, we need to know they will work across all sites. Manually creating sites makes that impossible. Remember, our goal is to create a CMS that is as easy to maintain for one site as it is for one hundred sites.

## Avoiding manual site creation

### Template sites

I originally solved the problem of doing automated site creations by doing the manual clicks once to configure our base Drupal site and calling this our template site. We then made a site creation script that copied the database, files and settings of that site to a new location. We did avoid having to manually create sites and repeat configuration, but we ran two very large problems:

* Changes made to the template site don't propagate to other sites
* Changes made to the template site aren't documented in source control

For those reasons, do not consider template sites. If template sites was the approach you've already invested in, invest out of it.

### Feature modules

[Features](https://www.drupal.org/project/features) is great. If you've never used it before, please [familiarize](http://www.mikestiv.com/blog/features-module-explained) [yourself](http://befused.com/drupal/features-first) [with](https://www.ostraining.com/blog/drupal/features/) [it](https://www.urbaninsight.com/2013/01/11/using-features-module-part-your-drupal-workflow). Features allows you to put all those clicks of configuration into modules, all without coding. Before you think you've found the solution to automating site builds, there are two caveats:

1. Not all configuration is "featurizable"

	Only configuration that is exportable through Drupal can be captured in a feature module. There are modules to help make more configuration in Drupal exportable. [Strongarm](https://www.drupal.org/project/strongarm) makes system variables exportable, so this module is an absolute must for features. [UUID](https://www.drupal.org/project/uuid) with [UUID Features Integration](https://www.drupal.org/project/uuid_features) helps uniquely identify content so that it can be exported into a feature and be unique and distributable across all your sites.

	Despite these modules, some configuration remains unfeaturizable. For example, vanilla Drupal ships with a basic page content type, and you may decide you don't want to confuse your users with this default when you create a more robust alternative to the basic page content type. Since there's no configuration to unset a content type, you need to run the action of deleting the content type. Features won't do that.

2. Configuration baked into a feature module can be overridden by your site admins, only for those overrides to be reverted by you later on

	I can't stress this enough, if you're looking to build a Drupal CMS to drive lots of sites, this is something you need to fully understand before doubling down on feature modules. Say you want all your institution's sites to use CAS authentication, so you set it up the way you'd like and put it into your feature module so you can deploy CAS authentication to all sites. Later, one of the site admins decides to change the CAS messaging to their satisfaction. Then you roll out an update to the CAS settings to all your sites, and undo that site admin's change. At best this creates a great deal of frustration with those in charge of the sites you've set up with your CMS. At worst you disrupt your production websites in a highly visible way you couldn't have anticipated through testing. Yes, I've been burned by this.

	So go ahead, build your feature modules, but build them knowing any configuration you set in a feature module should not be touched by a site admin in production. Don't ask your site admins nicely to not touch - **have a solution in place to ensure compliance**. I will cover this in much greater detail in a future post.


### Install and update hooks

Unlike features modules, creating install and update hooks to deploy configuration requires coding up a module from scratch. So what is an [install hook](https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_install/7)? It's logic that your module fires when it is installed for the first time. When you create your blank site and enable your deployment module, the install hook you've created will run, and execute your code. Which means you can use the entire Drupal API, run database queries, and execute actions that a features module is incapable of. That basic page content type we wanted to get rid of? Add a `my_module.install` file to your deployment module folder with this code, and done:

	<?php

	function my_module_install() {
		// Remove the basic page content type
		node_type_delete(array('page'));
	}

So what's an [update hook](https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_update_N/7) then? Well, the install hook only runs when the module is installed, not updated. If we decide we want a second version of our module that deletes the Article content type as well, we would update our install hook for new site installs, but also add an update hook for those sites that were running the module since the first version. [This is a good tutorial](http://befused.com/drupal/site-deployment-module) to get you going. There is a caveat of course:

1. Install/update hooks are a one-time deal

	Unlike configuration in features modules, these hooks run an action once. Once a site admin changes the configuration your module acted upon, it is forever changed. Unlike a feature, it will not be reverted back upon a future update of the module. Therefore, hooks should only touch configuration that you want to specify a default for, but are comfortable with site admins changing in the future. Or, if you don't want to user to change the action done in the hook, like I mentioned before, **have a solution in place to ensure compliance**. As an example, I use an install hook to disable the Overlay module since a feature cannot set that, but I don't want a site admin to bring Overlay back, so I don't give the site admin role the permission to manage modules.

### The solution

So what is the solution to avoiding manual site creation? Create a deployment module that featurizes all the configuration you don't want users to change. Add in install/update hooks to set all the configuration you do want users to change and install/update hooks to do the deployment actions that can't be achieved with features alone.

You might be wondering how you can mix a Drupal-generated features module with your own code. It's suprisingly simple: when you've generated your feature module, you can open up the `.module` file and add code. Subsequent rebuilds of the feature module through the Drupal UI will not overwrite the code in the `.module` file. Additional files like `.install` files will also be untouched by feature module generation. So build your feature module through the Drupal UI, add your code, and iterate on both afterwards.

## Rolling it out

Now that you have all your configuration in code ready to deploy, how do you deploy it?

### Drupal distributions

Here's what a Drupal distribution looks like:

	-rw-r--r--@  1 derekmcburney  staff    174  2 Sep 14:45 .gitignore
	-rw-r--r--@  1 derekmcburney  staff   5767  2 Sep 14:45 .htaccess
	-rw-r--r--@  1 derekmcburney  staff  98524  2 Sep 14:45 CHANGELOG.txt
	-rw-r--r--@  1 derekmcburney  staff   1481  2 Sep 14:45 COPYRIGHT.txt
	-rw-r--r--@  1 derekmcburney  staff   1717  2 Sep 14:45 INSTALL.mysql.txt
	-rw-r--r--@  1 derekmcburney  staff   1874  2 Sep 14:45 INSTALL.pgsql.txt
	-rw-r--r--@  1 derekmcburney  staff   1298  2 Sep 14:45 INSTALL.sqlite.txt
	-rw-r--r--@  1 derekmcburney  staff  17995  2 Sep 14:45 INSTALL.txt
	-rw-r--r--@  1 derekmcburney  staff  18092  2 Sep 14:45 LICENSE.txt
	-rw-r--r--@  1 derekmcburney  staff   8167  2 Sep 14:45 MAINTAINERS.txt
	-rw-r--r--@  1 derekmcburney  staff    235  2 Sep 14:45 PATCHES.txt
	-rw-r--r--@  1 derekmcburney  staff   5382  2 Sep 14:45 README.txt
	-rw-r--r--@  1 derekmcburney  staff   9642  2 Sep 14:45 UPGRADE.txt
	-rw-r--r--@  1 derekmcburney  staff   6604  2 Sep 14:45 authorize.php
	-rw-r--r--@  1 derekmcburney  staff    720  2 Sep 14:45 cron.php
	drwxr-xr-x@ 49 derekmcburney  staff   1666  2 Sep 14:45 includes
	-rw-r--r--@  1 derekmcburney  staff    529  2 Sep 14:45 index.php
	-rw-r--r--@  1 derekmcburney  staff    703  2 Sep 14:45 install.php
	drwxr-xr-x@ 72 derekmcburney  staff   2448  2 Sep 14:45 misc
	drwxr-xr-x@ 43 derekmcburney  staff   1462  2 Sep 14:45 modules
	drwxr-xr-x@  6 derekmcburney  staff    204  2 Sep 14:45 profiles
	-rw-r--r--@  1 derekmcburney  staff   1479  2 Sep 14:45 robots.txt
	drwxr-xr-x@ 13 derekmcburney  staff    442  2 Sep 14:45 scripts
	drwxr-xr-x@  6 derekmcburney  staff    204  2 Sep 14:45 sites
	drwxr-xr-x@  8 derekmcburney  staff    272  2 Sep 14:45 themes
	-rw-r--r--@  1 derekmcburney  staff  19986  2 Sep 14:45 update.php
	-rw-r--r--@  1 derekmcburney  staff   2178  2 Sep 14:45 web.config
	-rw-r--r--@  1 derekmcburney  staff    417  2 Sep 14:45 xmlrpc.php

As you can see, it looks exactly like Drupal core - it's a complete, server-ready copy of Drupal and all its files. But it also comes pre-loaded with any additional modules, themes and libraries that the distribution needs. What makes it all work is the installation profile included in the `/profiles` directory that you can select upon Drupal install. This profile will then apply all the configuration and settings your site should begin with. It functions exactly like the install and update hook based deployment module I mentioned previously. So you can write your install hooks directly into this installation profile instead of rolling them into a deployment module if you prefer, just remember it has the same caveats as we mentioned.

Once your [installation profile is written](http://evolvingweb.ca/blog/creating-multilingual-install-profile-drupal) and all your dependencies added, you can package up the files and roll it out to your servers to deploy your CMS.

### Drush makefiles

The alternative to putting together a Drupal distribution and all its files, is to write a [Drush makefile](http://www.drush.org/en/master/make/). A [Drush](http://www.drush.org) makefile is a YAML format file that Drush can run to build an entire Drupal distribution. Here's an early work in progress I'm cooking up for the new University of Calgary Drupal:

	core: 7.x
	api: 2

	projects:
	  #core
	  drupal:
	    version: "7.x"
	  #contrib
	  admin_menu:
	    subdir: contrib
	    version: ~
	  conditional_fields:
	    subdir: contrib
	    version: ~
	  config_perms:
	    subdir: contrib
	    version: ~
	  context:
	    subdir: contrib
	    version: ~
	  ctools:
	    subdir: contrib
	    version: ~
	  date:
	    subdir: contrib
	    version: ~
	  diff:
	    subdir: contrib
	    version: ~
	  ds:
	    subdir: contrib
	    version: ~
	  entity:
	    subdir: contrib
	    version: ~
	  entityreference:
	    subdir: contrib
	    version: ~
	  features:
	    subdir: contrib
	    version: ~
	  features_diff:
	    subdir: contrib
	    version: ~
	  field_collection:
	    subdir: contrib
	    version: ~
	  field_group:
	    subdir: contrib
	    version: ~   
	  link:
	    subdir: contrib
	    version: ~
	  module_filter:
	    subdir: contrib
	    version: ~
	  node_pane:
	    subdir: contrib
	    version: ~    
	  panels:
	    subdir: contrib
	    version: ~
	  pathauto:
	    subdir: contrib
	    version: ~
	  roleassign:
	    subdir: contrib
	    version: ~
	  strongarm:
	    subdir: contrib
	    version: ~
	  token:
	    subdir: contrib
	    version: ~
	  userone:
	    subdir: contrib
	    version: ~
	  uuid:
	    subdir: contrib
	    version: ~
	  uuid_features:
	    subdir: contrib
	    version: ~
	  views:
	    subdir: contrib
	    version: ~
	  views_between_dates_filter:
	    subdir: contrib
	    version: ~
	  webform:
	    subdir: contrib
	    version: ~
	  #sandbox
	  #http://drupal.org/sandbox/chrishks/2094111
	  pmp:
	    subdir: "sandbox"
	    type: module
	    download:
	      type: "git"
	      url: "git://git.drupal.org/sandbox/chrishks/2094111.git"
	    patch:
	      - "http://www.drupal.org/files/issues/pmp-access-and-edit-any-page-2577165-6.patch"
	  #ucalgary
	  ucalgary_call_to_action:
	    subdir: "ucalgary"
	    type: module
	    download:
	      type: "git"
	      url: "git://github.com/ucalgary/ucalgary_call_to_action.git"
	  ucalgary_deploy:
	    subdir: "ucalgary"
	    type: module
	    download:
	      type: "git"
	      url: "git://github.com/ucalgary/ucalgary_deploy.git"
	  ucalgary_event:
	    subdir: "ucalgary"
	    type: module
	    download:
	      type: "git"
	      url: "git://github.com/ucalgary/ucalgary_event.git"
	  ucalgary_more_info:
	    subdir: "ucalgary"
	    type: module
	    download:
	      type: "git"
	      url: "git://github.com/ucalgary/ucalgary_more_info.git"
	  ucalgary_roles:
	    subdir: "ucalgary"
	    type: module
	    download:
	      type: "git"
	      url: "git://github.com/ucalgary/ucalgary_roles.git"
	  ucalgary_layout:
	    subdir: "ucalgary"
	    type: module
	    download:
	      type: "git"
	      url: "git://github.com/ucalgary/ucalgary_layout.git"

The makefile specifies everything you need for your Drupal CMS: the specific versions of modules; the patches; contributed modules; modules from your own development repos; anything and everything. It's an easy, lightweight file, with an evolution that is easily described by source-control commmits. Just run `Drush make` to spit out a Drupal distribution.

### The solution

No matter how you choose to launch your sites, you are creating a Drupal distribution, because a distribution is simply all the files of Drupal core and dependent modules, libraries and themes. But is packaging a distribution into a tarball and passing it around the best way to roll out our sites? Well, like everything, it depends.

Creating and maintaing a package for your Drupal distribution can introduce bad practice. It is easier to slip in a patch, or a module version update into your package without documentation. Now, you're not crazy - whether you're building a whole distribution or just a Drush makefile, you are committing your changes into source control - but you may apply a patch to a module, and while the code difference will show up in source control, there may be no mention of where the patch came from. When you're building a CMS robust enough to handle the needs of hundreds of sites, you will likely be applying many patches including your own. Losing sight of where they come from and what issue they address makes future version updates to that code very difficult.

A Drush makefile makes that impossible. No matter how sloppy your commit messages are, the Drush makefile has to document version numbers and patch locations because it uses that information to generate the distribution. So my recommendation is for you to work off a makefile and generate your distributions through it, there are less mistakes that can be made. If you ever need to supply a full Drupal distribution package, you can do so, but build it from your Drush makefile, a required step to automated site deployment.
