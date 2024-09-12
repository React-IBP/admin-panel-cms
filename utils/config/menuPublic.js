// menuPublic.js
export const menuItems = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Single Post', href: 'single-post.html' },
    {
      label: 'Categories',
      href: '#',
      dropdown: [
        { label: 'Category 1', href: 'category.html' },
        {
          label: 'Deep Dropdown',
          href: '#',
          dropdown: [
            { label: 'Deep Dropdown 1', href: '#' },
            { label: 'Deep Dropdown 2', href: '#' },
            { label: 'Deep Dropdown 3', href: '#' },
            { label: 'Deep Dropdown 4', href: '#' },
            { label: 'Deep Dropdown 5', href: '#' },
          ],
        },
        { label: 'Category 2', href: 'category.html' },
        { label: 'Category 3', href: 'category.html' },
        { label: 'Category 4', href: 'category.html' },
      ],
    },
    { label: 'Contact', href: 'contact.html' },
  ];
  