import { createContext, useContext } from "react";

const BatchContext = createContext();

const BatchProvider = ({ children }) => {
  return <BatchContext.Provider>{children}</BatchContext.Provider>;
};

const useBatchContext = () => {
  return useContext(BatchContext);
};

export { BatchProvider, useBatchContext };
