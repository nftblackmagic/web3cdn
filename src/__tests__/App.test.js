import App from "../App";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { mount } from "enzyme";

test("renders learn react link", () => {
  const elem = (
    <>
      <Provider store={store}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </Provider>
    </>
  );
  const wrapper = mount(elem);
  expect(wrapper.render()).toMatchSnapshot();
});
