import CaptchaSolver from './CaptchaSolver';
import TrueCaptcha from './TrueCaptcha';

let captchaTypes: {
    [key: string]: typeof CaptchaSolver;
} = {
    TrueCaptcha: TrueCaptcha,
};

export default captchaTypes;
