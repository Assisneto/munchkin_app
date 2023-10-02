import { render } from "@testing-library/react-native";
import { Gender } from "./index";
import { ThemeProvider } from "../../theme/theme";

const darkTheme = {
  colors: {
    background: "#000",
    text: "#fff",
    headerText: "#fff",
    header: "#696969",
    iconColor: "#fff",
  },
};
jest.mock("styled-components", () => ({
  ...jest.requireActual("styled-components"),
  useTheme: () => ({
    colors: {
      background: "#000",
      text: "#fff",
      headerText: "#fff",
      header: "#696969",
      iconColor: "#fff",
    },
  }),
}));

jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => "Icon");

describe("<Gender />", () => {
  const renderWithTheme = (component: any) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  // it('renders male icon when gender prop is "male"', () => {
  //   const { getByTestId } = renderWithTheme(<Gender />);
  //   const icon = getByTestId("gender-male-icon");

  //   expect(icon).toBeTruthy();
  // });

  it('renderiza o ícone masculino quando gender é "male"', () => {
    const { getByTestId, toJSON } = renderWithTheme(<Gender gender="male" />);

    console.log(toJSON());

    const maleIcon = getByTestId("2");
    expect(maleIcon).toBeTruthy();
  });

  // it('renders female icon when gender prop is not "male"', () => {
  //   const { getByTestId } = render(<Gender gender="female" />);
  //   const icon = getByTestId("gender-female-icon");

  //   expect(icon).toBeTruthy();
  // });

  // it("uses the default size when no size prop is provided", () => {
  //   const { getByTestId } = render(<Gender gender="male" />);
  //   const icon = getByTestId("gender-male-icon");

  //   expect(icon.props.size).toBe(18);
  // });

  // it("uses the size prop when provided", () => {
  //   const providedSize = 24;
  //   const { getByTestId } = render(
  //     <Gender gender="male" size={providedSize} />
  //   );
  //   const icon = getByTestId("gender-male-icon");

  //   expect(icon.props.size).toBe(providedSize);
  // });
});
