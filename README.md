# React Router DOM Project

## Introduction
This project is for generating JSX files that include code for React Router DOM. Users can select a route type (either open or protected), type in a path name that starts with "/" (e.g. "/login"), and type in the React component name for that route (e.g. "Login"). Additionally, the project includes a checkbox for dynamic routes, where if checked, the input field for dynamic input is enabled and the user can type in a path like "/:userId". There is also a checkbox for exact routes, where if checked, the exact property is set to true for that route.

## Features
- Select route type (open or protected)
- Type in path name
- Type in React component name
- Checkbox for dynamic routes
- Input field for dynamic key for dynamic routes
- Checkbox for exact routes
- Add button to add route data to table
- Generate Code button to download a Route.jsx file with all the code according to the data in the table
- Table to display added routes data

## Technologies Used
- React
- React Router DOM

## How to use
1. Select the route type (open or protected)
2. Type in the path name that starts with "/" (e.g. "/login")
3. Type in the React component name for that route (e.g. "Login")
4. Check the checkbox for dynamic routes if it's a dynamic route
5. If dynamic routes checkbox is checked then input field for dynamic key will be enabled, type in dynamic key
6. Check the checkbox for exact routes if it's an exact route
7. Click on the "Add" button to add the route data to the table
8. Repeat steps 1-7 for adding more routes
9. Click on the "Generate Code" button to download the Route.jsx file with all the code according to the data in the table
10. Table will display all the added routes data

## Note
- Make sure to start path name with "/"
- Dynamic key should start with "/:"
- If the route is dynamic make sure to check the dynamic routes checkbox otherwise it will not work properly
- If the route is exact make sure to check the exact routes checkbox otherwise it will not work properly

## Conclusion
With this project, it will be easy to generate the JSX code for React Router DOM routes, making it convenient for developers to set up routing in their React projects. The project uses React and React Router DOM, with a simple and minimal UI, to provide a user-friendly interface for adding and generating routes.
