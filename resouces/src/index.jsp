<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Channel Tracking Analyze</title>
    <% for (var css in htmlWebpackPlugin.files.css) { %>
    <link href="<%=htmlWebpackPlugin.options.context%>/<%= htmlWebpackPlugin.files.css[css] %>" rel="stylesheet">
    <% } %>
  </head>
  <body>
    <div id="root"></div>
    <% for (var chunk in htmlWebpackPlugin.files.chunks) { %>
    <script src="<%=htmlWebpackPlugin.options.context%>/<%= htmlWebpackPlugin.files.chunks[chunk].entry %>"></script>
    <% } %>
  </body>
</html>
