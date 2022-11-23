import axios from 'axios';

export const sendMailToUser = async (name, email, content) => {
  const contents = {
    welcome: {
      subject: 'Welcome to App 🎉',
      textContent:
        'Search keywords and view their ranks, follow competitors, see what is trending and more...',
    },
    limit_exceeded: {
      subject: 'Limit Exceeded 😔',
      textContent:
        'You exceeded your limit 😔. To continue, subscribe to Premium Membership!',
    },
    deactivated_premium: {
      subject: 'Premium Deactivated 😔',
      textContent:
        'Sad to see you go 😔. If you are having problem with the Premium please contact with us via this link',
    },
    became_premium: {
      subject: 'Welcome to Premium 🎉',
      textContent: 'Welcome to the Premium side',
    },
  };
  const textContent = contents[content].textContent;
  const subject = contents[content].subject;
  try {
    const requestOptions = {
      url: 'https://api.sendinblue.com/v3/smtp/email',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.API_KEY,
      },
      data: {
        sender: { email: 'erenyusuf170@gmail.com', name: 'Yusuf Eren' },
        to: [{ email, name }],
        textContent,
        subject,
      },
    };
    await axios.request(requestOptions);
  } catch (error) {}
};
