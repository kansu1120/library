---
layout: default
---

# Indexy

<ul>
{% for f in site.files %}
  {% if f.extname == ".md" and f.name != "index.md" %}
    {% assign dir = f.path | split: "/" | slice: 0, -1 | join: "/" | append: "/" %}
    {% if dir == page.dir %}
      <li>
        <a href="{{ f.path | replace: ".md", "" | relative_url }}">
          {{ f.name | replace: ".md", "" }}
        </a>
      </li>
    {% endif %}
  {% endif %}
{% endfor %}
</ul>
