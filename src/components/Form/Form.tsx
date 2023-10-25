import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './form.scss';
import { setSubmitting } from '../../features/submitReducer';
import { fetchUserData } from '../../api/fetchUserData';
import { setIsLogged } from '../../features/isLoggedReducer';
import { setLogin, setLoginError, setPassword, setPasswordError, setSubmitError } from '../../features/formDataReducer';

export const Form: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(state => state.isSubmitting.isSubmitting);
  const { login, password } = useAppSelector(state => state.formData.formData);

  const {
    loginError,
    passwordError,
    submitError
  } = useAppSelector(state => state.formData.formErrors);

  const validateLogin = () => {
    login.trim().length === 0
      ? dispatch(setLoginError(true))
      : dispatch(setLoginError(false));
  };
  
  const validatePassword = () => {
    password.trim().length === 0
      ? dispatch(setPasswordError(true))
      : dispatch(setPasswordError(false));
  };

  const submitHandle = () => {
    validateLogin();
    validatePassword();

    if (login.trim().length > 0 && password.trim().length > 0) {
      dispatch(setSubmitting(true));

      fetchUserData(login, password)
        .then((response) => {
          if (response.message === 'Authentication successful.') {
            dispatch(setIsLogged(true))
          }
          dispatch(setSubmitError(true))
        })
        .catch((error) => console.log(error))
        .finally(() => dispatch(setSubmitting(false)));
    }
  }

  return (
    <div className="container">
      <form method="GET" className="form">
        <label className="form__label">Увійти</label>
        <input
          className="form__input"
          type="text"
          placeholder="Введіть ваш логін"
          value={login}
          onChange={(e) => dispatch(setLogin(e.target.value))}
          onBlur={validateLogin}
          ></input>

          {loginError && (
            <span className="form__error">Введіть будь ласка логін</span>
          )}

        <input
          className="form__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          onBlur={validatePassword}
          ></input>

          {passwordError && (
            <span className="form__error">Введіть будь ласка пароль</span>
          )}

        <button 
          type="submit"
          className="form__button"
          onClick={(e) => {
            e.preventDefault();
            submitHandle();
          }}
        >
          { isSubmitting
          ? <span className="loader"></span>
          : 'Увійти'
          }
        </button>

        {submitError && (
          <span className="form__error">
            Неправильно введений логін або пароль
          </span>
        )}
      </form>
    </div>
  );
};