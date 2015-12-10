---
title: "Creating A Drupal Distro That Scales - Part 3: Locking It Down"
layout: post
image: /files/2015-11-12-drupal-distros-that-scale-part-3/admin_permissions.png
tags: 
- drupal
description: "There's only one thing that can stop your organization's site admins from altering your Drupal CMS into every permutation and combination possible: permissions."
---

You've worked hard and just deployed the latest version of your Drupal CMS to your Higher-Ed institution, or your government agency or some other large organization where there may be dozens or even hundreds of site admins eager to use your Drupal CMS to build their websites. You got everything just perfect. Flexible content types packaged with beautiful templates. Panel page layouts that are useful and on-brand. Powerful views that marry rich content to dynamic results. Your site admins will be in heaven, and your brand will be wonderfully represented. Best of all you know the exact state of how your CMS is configured so that you can easily maintain, extend and upgrade how your CMS operates going forward.

That is, until you hand over login access to your site admins. The admin for the School of Engineering decides to override several of your view displays. The admin for the public parks site begins removing some fields from a content type. CSS overrides will be injected into a block here, the file system paths changed there, and so on and so on. Once users are on your CMS, assume they have made every permutation and combination of it possible. Because they have and they will. There's only one thing that can stop them: permissions.

## User one

When you first log into your site after creation, you'll notice you have access to everything. That's because you are user one. That is to say, you're the first user in the database and have a `uid` of 1. User one is God, and always has access to everything. Knowing this, there are two things that must be done:

* Never give any one access to this user account - only your development team should have access, and even then, sparingly use it.
* Protect this account from being modified or even seen by site admins by using a module such as [user_one](https://www.drupal.org/project/userone) or [user_protect](https://www.drupal.org/project/userprotect). If you don't do this, a site admin on one or several of your sites will delete the user or change it's username or password effectively blocking you from having this privileged access.

## Administrator permissions

With user one under your firm control, create your first Administrator and log in with that account. Even without being user one, by default the Administrator has access to pretty much everything.

![Administrator permissions](/files/2015-11-12-drupal-distros-that-scale-part-3/admin_permissions.png)

This is what Drupal believes an Administrator should be able to access by default, and it is technically *possible* that it ends up being what you will want your Administrators to access as well. But you need to be absolutely certain of what you are letting your users access. Knowing what your users are able to do ensures you know how your sites will evolve over time. If you leave user access open to something you didn’t intend, the results may be disastrous. If you have a feature module that contains some views that are standard across your sites and your users have permission to modify those views, you will come into conflict when you update those views across your sites later as you may override new settings that your admins have decided to use.

The best way to know with certainty what your users have access to? **Turn off all permissions, only adding them as needed**. Once you've turned off all permissions, here's a work flow to follow to begin enabling what you need:

1. Open your browser, log in as user one and go to the permissions page.
2. In a new private/incognito browser window open your site again and log in as a different user with the roles you want to create permissions for.
3. In your first browser window, as user one, check off the permissions you think you want and hit save.
4. In the private browser window, refresh and run tests to see what you now have access to. This is made much easier by using the [Administration menu](https://www.drupal.org/project/admin_menu) module, which provides an advanced fly out menu showing you everything you have access to.

## Not enough permissions

It may look like there are too many permissions in Drupal to deal with, but once you commit to the workflow above and add permissions as you need them for your users, you’ll notice Drupal actually suffers from the opposite problem - permissions aren't granular enough. Take for example `Administer site configuration`. I need to grant this permission to my site admins so they can set the name of their site, and possibly put their site in to maintenance mode. But look at all the other stuff that comes along for the ride when I enable the permission for the Administrator role:

![Configuration](/files/2015-11-12-drupal-distros-that-scale-part-3/configuration.png)

File system? Image toolkit? Page caching? I don't want my site admins seeing this stuff, or worse yet, changing it. While many of your site admins will be too scared to touch things they don't understand, many still will dabble into these areas, or more likely, pay for an outside consultant to touch all these areas to build something custom without you being involved or even aware. Fortunately the Drupal community recognizes that modules aren't granular enough and there are many modules out there to add more specialized permissions.

The [Custom Permissions](https://www.drupal.org/project/config_perms) module allows you to add more permissions based on the admin path which you can then switch off for all your roles. Want to allow the site admin to change their site name but not change the file system? Turn on `Administer site configuration`, but add a Custom Permission for `admin/config/file-system` and make sure it's switched off.


## Roles
It's easy to think that because an Administrator is such an important role that it should be able to do any function you grant "lesser" roles, such as adding content or moderating comments. This would be a mistake. There will exist sites where the Administrator has no interest in adding content but merely acts as business owner of the site, granting other users the ability to add content. So why confuse this type of Administrator by cluttering their user interface with links to all sorts of functionality they don't want to use?

Make roles focused on a specific set of duties and describe users through multiple roles. If another Administrator very much has their hands in the content, they can be granted an additional role that allows content generation. This makes the roles easy to describe, which in turn makes users abilities easy to describe through the roles they've been granted, and it is easier to maintain the roles over time.

Here are some of my suggestions of roles to provide:

### The Administrator
My interpretation of the Administrator role is that it is the role that is allowed to manage other users. Who has access to the site, and which users have which roles. The Administrator should also be able to set site-wide configuration that doesn't dabble into CMS-altering territory, such as the site title.

In a textbook example of why permissions need to be more granular, granting the Administrator role the ability to assign user roles gives the Administrator dangerous other abilities. Turning on `Administer users` still does not give the ability to assign a user's role. Only turning on `Administer permissions` grants that ability (and only if `Administer users` is also on). But turning on `Administer permissions` allows a user to change all permissions. **Never, ever grant this ability.** This will allow any site admin who has it to undo your carefully thought-out permissions strategy in seconds. Instead we have to use the [RoleAssign](https://www.drupal.org/project/roleassign) module to give us a new permission, `Assign roles`. If we grant a role the permission `Administer users` and `Assign roles`, we don't need to enable `Administer permissions` and the role can now set user roles without being able to change permissions.

**One very important caveat about the Administrator role**: when you add install new modules, they often enable new Administrator role permissions pertaining to that module by default. So if you're not looking you may give your site admins access to something without knowing it. When you install a new module make sure you deliberately set the permissions for it before rolling it out to your site admins.

### Content admins and Content authors
Two other roles I like to add are Content Administrators and Content Authors. Content Administrators can create, edit and delete anyone's content. They are the final say on what content is published. Content Authors can only create and work on their own content. I find this separation of roles is powerful, though you may want to consider Content Administrator and Author roles on a per-content-type basis as you may want a different set of users on your site may be able to edit events as opposed to articles or pages.

### The Developer

If you ever intend to have developers build or improve the functionality of your Drupal CMS, you'll need to give them many of the permissions that you just spent all this time locking down. Enter the Developer role. Many of the scariest permissions we removed for other users will likely be needed by your developers, such as `Administer features`, `Administer views` and `Administer content types`. But if we let our developer have these abilities doesn't this mean even after all our hard work we still have a Drupal CMS that can take on crazy new forms without our oversight? No, at least, not in production. The key is to **make sure the Developer role is never allowed in production**. Keep developers on development environments. I will cover workflow and governance with much greater detail in future posts. 

There are a lot of ways you can prevent the Developer role from being used in production such as not granting users that role in production or deleting the role from production sites, but those methods all involve a manual step that could be missed. We need to be absolutely certain that developer functions can't be accessed in production, so with that in mind here is code we are prototyping for our new Drupal launch:

	function ucalgary_roles_init() {
	    global $user;
	    static $drupal_static_fast;
	    if (!isset($drupal_static_fast)) {
	        $drupal_static_fast['perm'] = &drupal_static('user_access');
	    }
	    $perm = &$drupal_static_fast['perm'];
	    if (isset($perm[$user->uid])) {

	        // The developer role is only available on the dev environment
	        // This module assumes it's operating on Pantheon
	        // But you can set this environment variable on non-pantheon environments
	        if ($_ENV["PANTHEON_ENVIRONMENT"] != "dev") {
	            // Make a copy of the roles array,
	            $account_roles = $user->roles;

	            foreach ($account_roles as $rid => $role) {
	                if ($role == "developer") {
	                    unset($account_roles[$rid]);
	                }
	            }

	            // Get all permissions for user's roles
	            $role_permissions = user_role_permissions($account_roles);

	            $perms = array();
	            foreach ($role_permissions as $one_role) {
	                $perms += $one_role;
	            }
	            $perm[$user->uid] = $perms;
	        }
	    }
	}

This module uses [hook_init](https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_init/7) to check if the server has the development environment variable set. If it does not, it removes the developer role and unsets those permissions for the user. No manual intervention is required except for giving the server an environment variable that describes it as a dev server. In the above code [Pantheon](https://pantheon.io) is used and they automatically provide that environment variable leaving this implementation truly automated.

## Recap
That was a lot of information to take in. But if there's one thing to do right for your Drupal CMS that you plan to launch many sites with for your organization, it's this.

* Protect user one from all other users
* Start with no permissions enabled and add them as you need them
* Make permissions as granular as you need them by seeking out contributed module solutions or writing custom code
* Keep roles focused and describe users with multiple roles 
* Don't allow administrators to set permissions
* Developer permissions should only be granted on development servers
