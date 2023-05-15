# Notes

## Github

I learned that VS Code does NOT play nice if you try to use a github account that is different from the account that VS Code is logged into. I also learned that when you try to git pull on lines that you've already changed, VS Code will come up with a merge conflict that you need to resolve.

## HTML

### Things I learned while working on the HTML files
The biggest thing that I learned is that if you want to have multiple items on the same horizontal space, use a table. Another thing I learned is that I thought that by default, elements would occupy 100% of the width of the screen. I had to look online and add in style to my table to have it cover 100% of the screen's width. I also didn't think that centering a div horizontally would take very long, but I had to go through about 4-5 different solutions before I found one that worked. It was also surprising that hyperlinks within the same website don't need the entire website link, you can just say href="index.html" which I thought was really cool. I also learned that the production.pem is extremely picky about where you can call it from. It took me awhile to figure out that you're project has to be in the same folder as the production.pem for you to be allowed to call the production.pem file.

### Elements
`<html>` - represents the top level page structure<br>
`<head>` - contains metadata about the page and the page title<br>
`<body>` - represents the content structure<br>
`<main>` - represents the main content structure, as opposed to things like headers, footers, asides, and navigation content<br>
`<title>` - represents the title of the page<br>
`<meta>` - Metadata for the page such as character set or viewport setting<br>
`<script>` - JavaScript reference. Either a external reference, or inline<br>
`<include>` - External content reference<br>
`<header>` - Header of the main content<br>
`<footer>` - Footer of the main content<br>
`<nav>` - Navigational inputs<br>
`<section>`- A section of the main content<br>
`<aside>` - Aside content from the main content<br>
`<div>` - A block division of content<br>
`<span>` - An inline span of content(only uses as much space as the content needs)<br>
`<h1, h2, ...h9>` - Text heading. From h1, the highest level, down to h9, the lowest level<br>
`<p>` - A paragraph of text<br>
`<b>` - Bring attention<br>
`<table>` - Table<br>
`<tr>` - Table row<br>
`<th>` - Table header<br>
`<td>` - Table data<br>
`<ol,ul>` - Ordered or unordered list<br>
`<li>` - List item<br>
`<a>` - Anchor the text to a hyperlink<br>
`<img>` - Graphical image reference<br>
`<dialog>` - Interactive component such as a confirmation<br>
`<form>` - A collection of user input<br>
`<input>` - User input field<br>
`<audio>` - Audio content<br>
`<video>` - Video content<br>
`<svg>` - Scalable vector graphic content<br>
`<iframe>` - Inline frame of another HTML page<br>

### Attributes
`<p id="hello">` - attribute gives a unique ID to the element so that you can distinguish it from other elements<br>

### Special Characters
`&` - `&amp;`<br>
`<` - `&lt;`<br>
`>` - `&gt;`<br>
`"` - `&quot;`<br>
`'` - `&apos;`<br>

### Extra

The readme is at https://github.com/Dakota3145/startup/blob/main/README.md
