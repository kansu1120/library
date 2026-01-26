---
layout: default
---

# Index

<ul>
{% assign base = page.url | replace: "index.html", "" %}

{% for p in site.pages %}
  {% if p.url contains base and p.name != "index.md" %}
    <li>
      <a href="{{ p.url }}">
        {{ p.name | replace: ".md", "" }}
      </a>
    </li>
  {% endif %}
{% endfor %}
</ul>
