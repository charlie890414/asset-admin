import CaptchaSolver from './CaptchaSolver';
import TrueCaptcha from './TrueCaptcha';

let captchaTypes: {
    [key: string]: (arg0: any) => CaptchaSolver
} = {
    TrueCaptcha: (prarm: { userid: string; apikey: string; mode: string; }) => new TrueCaptcha(prarm),
};

export default captchaTypes;
