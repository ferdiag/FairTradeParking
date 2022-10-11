export const handleQuantity = (e, index, upgrade, copyListOfMenus) => {
  let updatedQuantity = copyListOfMenus[index].quantity;

  if (upgrade === 'up') {
    updatedQuantity = copyListOfMenus[index].quantity + 1;
  } else {
    if (copyListOfMenus[index].quantity > 0) {
      updatedQuantity = copyListOfMenus[index].quantity - 1;
    } else {
      updatedQuantity = 0;
    }
  }

  copyListOfMenus[index].quantity = updatedQuantity;
  console.log(copyListOfMenus);
};
