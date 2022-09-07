# ChileanRutify

[![reviewdog](https://github.com/mihailpozarski/chilean-rutify-js/workflows/reviewdog/badge.svg?branch=main&event=push)](https://github.com/mihailpozarski/chilean-rutify-js/actions?query=workflow%3Areviewdog+event%3Apush+branch%3Amain)

Chilean Rutify is a javascript npm package that makes rut validations and manipulation easy

## Installation

install `chilean-rutify` through npm:

```bash
npm install chilean-rutify
```

## Usage
You can use the available utility methods by importing the `ChileanRutify` class instance:

```js
import ChileanRutify from 'chilean-rutify';

// using an example rut '36.408.368-8'
let rut = '36408368-8';
ChileanRutify.normalizeRut(rut);
// 364083688
ChileanRutify.formatRut(rut);
// "36.408.368-8"
ChileanRutify.validRut(rut);
// true
ChileanRutify.validRutVerifier(rut)
// true
ChileanRutify.validRutValues(rut)
// true
rut = '36408368';
ChileanRutify.getRutVerifier(rut)
// "8"
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/mihailpozarski/chilean-rutify-js. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/mihailpozarski/chilean-rutify-js/blob/main/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the ChileanRutify project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/mihailpozarski/chilean-rutify-js/blob/main/CODE_OF_CONDUCT.md).
