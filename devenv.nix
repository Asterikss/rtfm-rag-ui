{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
    pnpm = {
      enable = true;
    };
  };

  languages.typescript.enable = true;

  dotenv.disableHint = true;
}
