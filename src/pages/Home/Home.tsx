import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import React, { useContext } from "react";
import RoutingForm from "../../component/RoutingForm/RoutingForm";
import { GlobalContext } from "../../Context";
import { createRoutings, download } from "../../Services/routingServices";
import "../../styles/Routing.css";

function generateFiles(data: any[]) {
  const date = new Date();
  const time = `-${date.toDateString()}-${date.toLocaleTimeString()}`;
  const file = createRoutings(data.slice(0, -1)).join("");
  download(`Routing ${time}.jsx`, file);
}

const Home = () => {
  const {
    state: { routing },
  } = useContext(GlobalContext);
  return (
    <div className="routing">
      <div className="routing-input">
        {!!routing?.length &&
          routing?.map((item: any, index: number) => (
            <RoutingForm key={index} index={index} />
          ))}
      </div>
      <div className="routing-lists">
        {!!routing?.length && (
          <Table className="routing-table">
            <TableHead className="routing-head">
              <TableRow className="routing-head-row">
                <TableCell width={150}>Route</TableCell>
                <TableCell width={200}>Path</TableCell>
                <TableCell width={200}>Component</TableCell>
                <TableCell width={200}>Dynamic</TableCell>
                <TableCell width={150}>Is Dynamic?</TableCell>
                <TableCell width={150}>Is Exact?</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="routing-body">
              {routing?.map((item: any, index: number) => (
                <TableRow key={index} className="routing-body-row">
                  <TableCell>
                    {item?.protected === "true"
                      ? "Protected Route"
                      : "Open Route"}
                  </TableCell>
                  <TableCell>{item?.path}</TableCell>
                  <TableCell>{`<${item?.component} />`}</TableCell>
                  <TableCell>{item?.dynamic || "-"}</TableCell>
                  <TableCell>{`${String(item?.isDynamic)}`}</TableCell>
                  <TableCell>{`${String(item?.isExact)}`}</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <button
        className="routing-generate-btn"
        onClick={() => generateFiles(routing)}
      >
        Generate Code
      </button>
    </div>
  );
};

export default Home;
