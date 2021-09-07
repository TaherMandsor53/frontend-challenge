const transformUserData = userData => {
  return (
    userData &&
    userData.map(_ => {
      return {
        id: _.id,
        name: _.name,
        userName: _.username,
        email: _.email,
        city: _.address.city,
        company: _.company.name,
        phone: _.phone,
      };
    })
  );
};

export default {
  transformUserData,
};
