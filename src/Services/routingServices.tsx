const protectedRouteText = `export const ProtectedRoute = ({children}) => {\n\tconst navigate = useNavigate()\n\tconst token = localStorage.getItem("token");\n\tif(!!token) return ({children});\n\treturn navigate("/")\n}\n`;

export const createComponent = (name: string) => {
  return `export const ${name} = () => {\n\treturn (<div>${name}</div>);\n}\n`;
};

export const createProtectedRoute = (route = protectedRouteText) => {
  return route;
};

export const createRoutings = (data: any) => {
  const finalRoute = [
    `/* npm i react-router\n\thttps://www.npmjs.com/package/react-router\n\tnpm i react-router-dom\n\thttps://www.npmjs.com/package/react-router-dom\n*/\n`,
    `import React from "react";\n`,
    `import {BrowserRouter} from "react-router-dom";\n`,
    `import {Routes, Route} from "react-router";\n\n`,
    `export const Route = () => { \nreturn(\n`,
    `\t<BrowserRouter>\n`,
    `\t\t<Routes>\n`,
  ];
  const components: string[] = [];
  const protectedRoutingData: any[] = [];

  data.forEach((route: any) => {
    components.push(createComponent(route?.component));
    if (route?.protected === "true") {
      return protectedRoutingData.push(route);
    }
    const isDynamic = route?.isDynamic;
    const newRoute = `\t\t\t<Route path="${route?.path}${
      isDynamic ? String(route?.dynamic) : ""
    }" exact={${String(route?.isExact)}} element={<${route?.component} />}/>\n`;
    finalRoute.push(newRoute);
  });
  if (protectedRoutingData?.length) {
    finalRoute.push(`\t\t\t<ProtectedRoute>\n`);
    finalRoute[2] = `import {BrowserRouter,useNavigate} from "react-router-dom";\n`;
    protectedRoutingData.forEach((route) => {
      const isDynamic = route?.dynamic;
      const newRoute = `\t\t\t\t<Route path="${route?.path}${
        isDynamic ? String(route?.dynamic) : ""
      }" exact={${String(route?.isExact)}} element={<${
        route?.component
      } />}/>\n`;
      finalRoute.push(newRoute);
    });
    finalRoute.push(`\t\t\t</ProtectedRoute>\n`);
  }
  finalRoute.push(`\t\t</Routes>\n`);
  finalRoute.push(`\t</BrowserRouter>\n`);
  finalRoute.push(`)}\n\n`);
  finalRoute.push(...components);
  if (protectedRoutingData?.length) finalRoute.push(createProtectedRoute());

  return finalRoute;
};

export function download(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
