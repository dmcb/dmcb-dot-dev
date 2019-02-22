---
title: "Creating A Drupal Distro That Scales - Part 4: Crafting Great Features"
image: /assets/drupal-blog/2015-12-10-drupal-distros-that-scale-part-4/news_content_editing.gif
description: "How can your Drupal functionality be flexible enough for your site admins to get what they need out of it, while being general enough that it exists as one module you can maintain?"
---

You're building amazing news functionality for a site. Your news page is powered by a view that is serving up your news content type. You've tailored the view for the site you're building it on, with view modes for each type of news this particular site needs, and node display modes to represent the news in the way this site demands. And if you were building this news functionality for just this site, you would be done.

But you don't have the luxury of building it for just one site, because you're building against a Drupal platform that will serve up dozens or even hundreds of sites for your organization. This news page needs to be loaded onto many sites and provide enough flexibility for your users to get what they need out of it, while being general enough that it exists as one module you can maintain and update across all your sites.

## Content vs. Functionality

How can we build functionality to be flexible yet generalized for a variety of sites? Well, it sounds obvious, but before we can do anything we must define what we mean by functionality. And in Drupal, this is actually very hard.

Drupal blurs the lines between content and functionality. You can create both through the user interface by default, [which is one reason why I recommend locking down your permissions](/blog/drupal-distros-that-scale-part-3/), as that's a horrible default. Drupal stores anything you create through the user interface in the database, so records of content exist alongside definitions of functionality. It's nice that we can build so much site functionality strictly through the user interface, but that doesn't mean we should leave it there (more on that later!).

So with Drupal blurring the lines, what is functionality? I would define functionality in Drupal as anything that allows you to create or present content. In addition:

* [Functionality should live in code and be deployable from source control](/blog/drupal-distros-that-scale-part-2/). If a site dies and you have no backup**\***, you should be able to bring back a content-less version by deploying all your code from source control.
* Functionality should be site-agnostic. You will certainly build functionality that's only  used by one site, but that functionality shouldn't always limit itself to just that one site by including messaging or settings specific to that site.

With our definition in hand, here's a quiz:

* Views? **Functionality**. They represent content by listing it in a dynamic way that you build.
* Nodes? **Content**. These are instances of your content types and contain the field data specific to your site.
* Menu items? **Content**. The pages to be shown in a menu is specific to a site.
* Menus? **Functionality**. This is a tricky example, but menus are how you choose to create your menu items, which are content, on your site. If you have other functionality that interacts with menus, they will need to make assumptions about what menus exist, and as such menus would need to be held constant across sites.
* Content types? **Functionality**. This defines how content will be created on a site.
* Taxonomies? **Functionality**. Like menus, the buckets of taxonomy terms will be held constant across sites.
* Taxonomy terms? **Content**. Terms in taxonomies that are unique to a site are content that a Content Administrator can create and manage.

Now that we have a less blurry vision than Drupal provides of what functionality actually is, let's build some.


**\*** Have a backup.


## A Workflow

Drupal is powerful and allows lots of functionality to be built through the user interface without needing code. Leveraging that power for rapid development is great as long as we remember what we build must make it to code so that it meets our definition of functionality, and it can be deployed across many sites. The [features modules](https://www.drupal.org/project/features) allows us to do that conversion from user interface into code. [More detail on this is provided in a previous post](/blog/drupal-distros-that-scale-part-2/).

1. Build content types, views, permissions, etc. on a site through the UI.
2. Check off everything that was built for inclusion into a feature module.
3. Generate your feature to the file system.
4. Add code to include additional functionality and presentation that cannot be built through the UI.
5. Commit to source control.

## Keeping things flexible yet consistent

Now that we have a workflow to building feature modules, how can a feature module tackle a specific need for a site while being general enough to be used on other sites? Let's work through the news example.

**Site 1's requirements for news:**

* Title
* Date
* Text
* Author
* A link to Author's website
* View that shows all news

**Site 2's requirements for news:**

* Title
* Date
* Text
* Tagged by 'Press Release' and 'Event'
* View that only shows events
* News nodes tagged 'Press Release' have different styling

As you can see, both sites require the basics of a news content type: a title, date and text. But **Site 1** would like more fields to do with an author (yes, an author should likely be an entity reference to an author content type, but for simplicity's sake in this example we will have it this way). **Site 2** would like an alternate presentation of news, with 'Press Release' tagged items getting a different treatment. Both sites need to make use of a view, but **Site 2** would like their view to only show news tagged with 'Event'.

It seems difficult, but possible to build a feature module to handle news for both sites. However, the authoring experience may be quite clunky, and we may have similar but mostly repetitive views, and likely need to write some per-site CSS to handle presentation. But we can do it. If we had a third site with different requirements still, it may break our solution.

Or, are there some tricks we can use to generalize our feature module to handle both cases and even more we haven't thought of?

### Fields

Let's build out our news content type. In order to accomodate both **Site 1** and **Site 2**'s requirements, we need to add all fields needed by both:

![Fields](/assets/drupal-blog/2015-12-10-drupal-distros-that-scale-part-4/news_fields.png)

This results in a clunky user experience for **Site 2**, as **Site 2** doesn't need fields for authors. But in order to server both sites with the same feature, we need to include all fields. But there is an option for making a better content editing experience, [Conditional Fields](https://www.drupal.org/project/conditional_fields). We can add an 'Add Author' list field with two options, yes or no, to our content type. We can then add a field dependency through Conditional Fields to show (or even require) the Author fields based on what is selected for the 'Add Author' field. As this field is only used to internally to manage this content type, make sure to hide it in the 'Manage Display' section of the content type.

![Conditional fields](/assets/drupal-blog/2015-12-10-drupal-distros-that-scale-part-4/news_conditional_fields.png)

Now **Site 1** can have its author fields, and **Site 2** doesn't need an overly complicated editing interface:

![Editing the content type](/assets/drupal-blog/2015-12-10-drupal-distros-that-scale-part-4/news_content_editing.gif)

### Taxonomies

Let's create our view that shows all news:

![View](/assets/drupal-blog/2015-12-10-drupal-distros-that-scale-part-4/news_view.png)

**Site 2** needs a view that shows only events. We could add a new display mode with a filter on the event tag. But what if **Site 2** wants their news view to now only show Press Releases, and then Sites 3 through 48 come online and want to filter on new tags you hadn't even thought of (afterall, tags are content and Administrators are fully expected to build out taxonomies relevant to their sites' needs). It's not sustainable for us to keep adding display modes to our view. Instead we can use the power of contextual filters with taxonomies. A contextual filter can allow the taxonomy term for the view to filter against to be passed via the URL:

![Contextual filter](/assets/drupal-blog/2015-12-10-drupal-distros-that-scale-part-4/news_contextual_filter.png)

This allows us to keep one view with one display mode and handle filtering against all types of taxonomy terms. When no term is supplied, all news is shown. **Site 1** can have a menu item to the news list at /news-list. **Site 2** can have a menu item to their news list point to /news-list/event so they can show only events. Sites 3 through 48 can do whatever they need to do with the flexibility we've now built into our feature.

### Code

The final piece of our example is for **Site 2** to render news that is tagged 'Press Release' differently. Though there's probably some module somewhere to do this, we can quickly achieve this in code. Our functionality belongs in code anyway, so using Features, we can check off the items we need to generate module code:

![Building a feature](/assets/drupal-blog/2015-12-10-drupal-distros-that-scale-part-4/news_feature.png)

Once we have generated the feature to code, we can open up the generated `.module` file and add a [node preprocess hook](https://api.drupal.org/api/drupal/modules%21node%21node.module/function/template_preprocess_node/7) that will add a CSS file (or do whatever logic you'd like to dream up).

    function mynews_preprocess_node(&$variables) {
        $node = $variables['node'];

        if ($node->type == "news") {
            $module_path = drupal_get_path( 'module', 'mynews' );

            // Get vocabulary id (vid) of tags taxonomy that news uses
            $vid = db_query('SELECT vid FROM {taxonomy_vocabulary} WHERE machine_name = :machine_name', array(':machine_name' => 'tags'))->fetchField();

            // Get taxonomy term id (tid) of 'Press Release'
            $query = new EntityFieldQuery;
            $result = $query
                ->entityCondition('entity_type', 'taxonomy_term')
                ->propertyCondition('name', 'Press Release')
                ->propertyCondition('vid', $vid)
                ->execute();
            $tid = array_shift($result['taxonomy_term'])->tid;

            // Get tags on this news node
            $items = field_get_items('node', $node, 'field_mynews_tags');
            foreach ($items as $item) {
                if ($item['tid'] == $tid) {
                    // This news node is tagged 'Press Release', do cool things here
                    drupal_add_css($module_path.'/css/mynews.css');
                    // etc...
                }
            }
        }
    }

A theme is emerging here. We are building feature modules that contain fields which describe how to treat the content. This gives Content Administrators the ability to control how their content can work for their site, without having to change the functionality we supply them. This is the flexibility and power we need from our functionality if it is to be useful on many websites.

## Making your feature production-ready

### You're global whether you like it or not

When building your features, remember that you are building against a global, open-source platform. You may not ever wish to share what you build with the world, but you will most certainly use what others have shared. Future-proof your features by ensuring that the feature, and all its content types, fields, views, etc. have machine names that are globally unique.

Our features were originally prefixed with **uofc**, such as uofc_events. But the [University of Chicago](http://www.uchicago.edu), should they enter the Drupal space, may conflict with that. The new round of features are prefixed **ucalgary**, we're good now.

### Create naming rules

In addition to creating a globally unique prefix for your machine names, you should make sure you have rules for naming what comes after that prefix. There is often a character limit on these machine names, so making sure you have a rule you follow to make your machine names descriptive yet small enough to fit in is important.

Field machine names have a 32 character limit, 26 characters in practice because 'field_' is required, so when we follow a rule of field_institutionprefix_feature_field, we run into that limit often. Say I have a feature **Call to Action**, and a field called **Metadata**, our field machine name would be field_ucalgary_call_to_action_me<span style='color: red;'>tadata</span>. Doesn't fit. So our rule now informs us to condense our feature name into a prefix as well for all field names. So **call_to_action** became **cta**, and our machine name is now field_ucalgary_cta_metadata.

### Avoid content type field collisions

By default, fields have a 1 to many relationship with content types. This means you can reuse the same field in one content type in another content type. This is nuts. It might seem like a good idea to have, for eaxmple, a tags term reference field that is used by multiple content types so that you can change the field in one place for easy maintenanance, but it's not. If you ever decide to take a content type in a different direction, and want to tweak that shared field for just that one content type, you cannot. You would have to delete the field, and create a new one - if the content type is already in the wild and people are using it, this becomes a time consuming and difficult task to keep that data and migrate it to the new field.

Drupal out of the box tries attempts to get you to follow the bad practice of sharing fields. When you create a new content type, it comes with a body field that you can edit. **Delete this**. **Delete it every single time you make a new content type**. Make your own body field name-spaced to your specific content type. Otherwise, once you build out your content types, there will invariably be a situation where two content types want to do something different with that body field. Remember, your working in a global, open-sourced world. You may wish to load your content types on to another environment where that field is used in a different way, leading to a collision.

## Good luck

It takes more thought to designing features that can meet the needs of more than one site and more development time to build them. But the benefits of crafting your features that way are enormous when building for a multi-site organization. A little more investment upfront means a lot less work building and maintaining features overall. I have suggested a few ways in which you can make more flexible features, but the sky is the limit with what solutions you can come up with.

Good luck and let me know how you do!
