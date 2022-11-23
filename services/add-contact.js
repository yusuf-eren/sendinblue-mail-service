import axios from 'axios';

export const saveUserToMailService = async (name, email, categoryName) => {
  const categoryNames = {
    allUser: 6,
    premiumUser: 7,
    deactivatedPremiumUser: 8,
  };
  const nameSurname = name.split(' ');

  let method = 'POST';
  let url = 'https://api.sendinblue.com/v3/contacts';
  const listIds = [categoryNames[categoryName]];
  let unlinkListIds = [];

  // When user cancelled subscription we will unlink from the
  // premium users list and we will add to deactivated users
  if (listIds[0] === 8) {
    unlinkListIds.push(7);
    method = 'PUT';
    url = `https://api.sendinblue.com/v3/contacts/${email}`;
  }

  try {
    const requestOptions = {
      url,
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.API_KEY,
      },
      data: {
        attributes: {
          FIRSTNAME: nameSurname[0],
          LASTNAME: nameSurname[nameSurname.length - 1],
        },
        listIds,
        unlinkListIds,
        updateEnabled: true,
        email,
      },
    };
    await axios.request(requestOptions);
  } catch (error) {}
};
