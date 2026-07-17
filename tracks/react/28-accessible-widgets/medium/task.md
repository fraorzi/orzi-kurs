# Tabs z ręczną aktywacją i roving focus

Zaimplementuj `SettingsTabs` z zakładkami `Profil`, `Bezpieczeństwo` i
`Powiadomienia` zgodnie z wzorcem WAI-ARIA tabs.

- Kontener ma rolę `tablist` i nazwę `Ustawienia`.
- Każda kontrolka ma rolę `tab`, `aria-selected`, `aria-controls` i relację z
  panelem `tabpanel` przez `aria-labelledby`.
- Dokładnie aktywny/focusowalny tab ma `tabIndex=0`, pozostałe `-1`.
- ArrowRight i ArrowLeft przenoszą focus z zawijaniem, ale nie aktywują panelu.
- Enter lub Space aktywuje tab z focusem.
- Kliknięcie ustawia jednocześnie focusowalny i wybrany tab.
