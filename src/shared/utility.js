export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const searchByText = (data = [], searchText = '') => {    
  let searchingData = [...data];
  return searchingData.filter((item) => {
    const matchingItem = Object.values(item).find(value => {
      if(typeof value === 'object') return null;
      return value.toString().toLowerCase().includes(searchText.toString().toLowerCase());
    });
    return matchingItem;
  });
}
