import { store } from "@/redux/store";
import { FC } from "react";
import { Provider } from "react-redux";

type Props = {
    children: React.ReactNode;
};

const AppProvider: FC<Props> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
