declare module "*.scss" {
  type ClassName = string;
  const classNames: Record<ClassName, string>;
  export default classNames;
}
