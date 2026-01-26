---
layout: default
---

# Index

<ul>
{% for f in site.static_files %}
  {% if f.extname == ".md" %}
    {% if f.path contains page.dir %}
      {% unless f.name == "index.md" %}
        <li>
          <a href="{{ f.path | replace: ".md", "" }}">
            {{ f.name | replace: ".md", "" }}
          </a>
        </li>
      {% endunless %}
    {% endif %}
  {% endif %}
{% endfor %}
</ul>
