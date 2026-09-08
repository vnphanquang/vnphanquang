{
  pkgs,
  ...
}:
{
  languages.javascript = {
    enable = true;
    pnpm = {
      enable = true;
      install.enable = true;
    };
  };
  packages = with pkgs; [ lefthook ];

  scripts.intro.exec = "lefthook install ";

  enterShell = ''
    intro
  '';
}
