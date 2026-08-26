import "styled-components";
import { theme } from "./styles/theme";

type AppTheme = typeof theme;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DefaultTheme extends AppTheme {}
}
