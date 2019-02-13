---
layout: default
title: Drupal Blog
permalink: /things/drupal-blog/index.html
---
  <ul class="posts">
    {% assign post-list = site.drupal-blog-posts | sort:"date" %}  
    {% for post in post-list %}
    <li>
      <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
        <h2>
          {{ post.title }}
        </h2>
        <p>{{ post.description }}</p>
      </a>
    </li>
    {% endfor %}
  </ul>