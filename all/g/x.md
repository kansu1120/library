---
layout: default
---

# Index

<ul>
{% for p in site.pages %}
  {% if p.dir == page.dir and p.name != "index.md" %}
    <li>
      <a href="{{ p.url }}">
        {{ p.name | replace: ".md", "" }}
      </a>
    </li>
  {% endif %}
{% endfor %}
</ul>
