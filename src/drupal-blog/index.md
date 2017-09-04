---
layout: default
title: Drupal Blog
---

<div class="home">
  <ul class="post-list">
    {% assign post-list = site.drupal-blog | sort:"date" %}  
    {% for post in post-list %}
    <li>
      <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
        <h2>
          {{ post.title }}
        </h2>
        <span class="post-meta">
          {{ post.date | date: "%B %Y" }}
        </span>
        <p>{{ post.description }}</p>
      </a>
    </li>
    {% endfor %}
  </ul>
</div>
