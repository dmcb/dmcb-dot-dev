---
layout: default
title: Blog
permalink: /blog/
---

<div class="home">
  <ul class="post-categories">
    <li>
      <a class="page-link" href="{{ site.baseurl | append: site.tag_dir }}">All posts</a>
    </li>
    {% for tag in site.tags %}
    <li>
      <a class="page-link" href="{{ site.baseurl | append: site.tag_dir}}/{{ tag[0] }}/">{{ tag[0] | capitalize }}</a>
    </li>
    {% endfor %}
  </ul>
  <ul class="post-list">
    {% for post in site.posts %}
    <li>
      <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
        <h2>
          {{ post.title }}
        </h2>
        <span class="post-meta">
          {{ post.date | date: "%B %Y" }}{% for tag in post.tags %}, <span class="tag">{{ tag }}</span>{% endfor %}
        </span>
        <p>{{ post.description }}</p>
      </a>
    </li>
    {% endfor %}
  </ul>
</div>
