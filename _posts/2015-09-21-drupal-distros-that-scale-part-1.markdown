---
title: "Creating a Drupal distro that scales - Part 1: Why This Matters"
layout: post
image: /files/2015-09-21-drupal-distros-that-scale-part-1/sites.jpg
tags:
- web development
description: "Drupal is a powerful platform for website generation, but once you unleash it upon your institution, everything that can happen will happen. This is my guide to ensuring only the good things happen."
---

I've been with the [University of Calgary](http://www.ucalgary.ca/)'s Drupal team for the past 7 years, and have had the good fortune to lead its development. I joined the team shortly after Drupal was in production and most of our faculties and departments had already built their new sites on the platform. Everything was wonderful. We moved our university's web presence from a wild-west of random Frontpage and Dreamweaver websites with no consistent presentation or implementation to a world in which the presentation was uniform, and the experience for our content authors was consistent. It was revolutionary. So what could go wrong?

When we spun up Drupal, we created our base site configuration, our theme, a few custom modules for our users, and provided it to campus. We built scripts to provision our environment so we could create, delete and clone sites, and load sites with new modules when they were requested, all in an automated fashion - important when you're serving a campus of 30,000 individuals. When our users needed new functionality, we would build it on to their site, or our advanced users would build it themselves (often requesting us to load on new modules to their site). It all seemed to work.

## Drupal is not a web content management system, it is a web content management framework

Soon 10 Drupal sites grew to 50 sites. 50 sites grew to 200. 200 to 800. But we thought had things under control, it was after all, 800 sites under one content management system. Some had blogs, some had event calendars, some had photogalleries, but it was all pretty much the same. But as our team was left to maintain such a large environment, we realized many of those sites had different implementations of those things, making maintenance time consuming and difficult. We didn't have a web content management system we were in control of, we had a web content management *framework*. We gave that framework to our community, and our community was building individual CMSs with it. We were left not with 800 sites under one CMS, but 800 CMSs under one framework.

![Many, many sites](/files/2015-09-21-drupal-distros-that-scale-part-1/sites.jpg)

If I've lost you there, let me try to clear things up. A web content management system provides you a way to present content on web pages. It comes with all the types of content you make, like blogs, news, etc. already defined. You simply create the content. Drupal is not that (though it likes to trick you by providing a few basic types of content like pages and articles by default). Drupal is a web content management framework, you use it to build a web content management system. It gives you tools to create new types of content, editing interfaces for that content, layout systems and so on and so on - basically all the stuff you don't want your users playing around with. Because if they do, they will come up with every permutation and combination of Drupal they can make. You can imagine the headache when your environment has grown to 800 sites that behave differently, and you're expected to maintain it.

## Going forward

Fortunately, through the years I've run Drupal and upgraded it from 4 to 5 to 7, I've identified the central issues that allowed our Drupal distribution to fall into disrepair:

* Users with far too much access to change Drupal functionality
* Unclear definitions of content vs. configuration
* Building functionality into sites instead of modules
* A lack of governance
* No dev to test to prod workflow

I've made significant progress addressing these issues in our current environment and I now have the opportunity to design and build a new Drupal distribution for the University from the ground up. So I'm inviting you to join me on this initiative. I'm going to discuss all of the issues in greater detail and try to solve them with strategy, design, modules and code. If your tackling a Drupal implementation for your own institution, this should be valuable reading.

## A warning

Before we get started, I have to mention that there is no silver-bullet in Drupal. Due to its power and flexibility, there are a million ways to achieve a solution. I don't have all the answers. What I have is a lot of experience in what can go wrong, and ideas to make things go right. Specific solutions I present may not always be applicable for your implementation, but the discussion will hopefully strengthen your confidence in your own approach.

Thanks for tuning in and I look forward to your feedback!