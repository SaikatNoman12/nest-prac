export const AllowAnonymous = () => {
  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    console.log('propertyDescriptor', propertyDescriptor);
    console.log('The allow anonymous decorator is called!:' + propertyKey);
  };
};
