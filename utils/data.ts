export const getExploreNearby = async () => {
  const exploreNearbyResponse = await fetch(
    'https://firebasestorage.googleapis.com/v0/b/edwintantawi-25f09.appspot.com/o/airbnb-web-clone%2Fexplore-nearby.json?alt=media'
  );
  return exploreNearbyResponse.json();
};

export const getLiveAnywhere = async () => {
  const liveAnywhereResponse = await fetch(
    'https://firebasestorage.googleapis.com/v0/b/edwintantawi-25f09.appspot.com/o/airbnb-web-clone%2Flive-anywhere.json?alt=media'
  );
  return liveAnywhereResponse.json();
};

export const getSearch = async () => {
  const searchResponse = await fetch(
    'https://firebasestorage.googleapis.com/v0/b/edwintantawi-25f09.appspot.com/o/airbnb-web-clone%2Fsearch.json?alt=media'
  );
  return searchResponse.json();
};
