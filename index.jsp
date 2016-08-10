<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Channel Tracking Analyze</title>
    <script>
        window.config = {
            currentUser: "${currUser.email}",
            context: "<%=request.getContextPath()%>"
        }
    </script>
    
    <link href="<%=request.getContextPath()%>/static/css/commons_865e1.css" rel="stylesheet">
    
  </head>
  <body>
    <div id="root"></div>
    
    <script src="<%=request.getContextPath()%>/static/js/vendors_20160705.js"></script>
    
    <script src="<%=request.getContextPath()%>/static/js/apps_865e1.js"></script>
    
  </body>
</html>
