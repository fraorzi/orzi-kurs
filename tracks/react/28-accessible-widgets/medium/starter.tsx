import { useState } from "react";

const tabs = [
  { id: "profile", label: "Profil", content: "Dane profilu" },
  { id: "security", label: "Bezpieczeństwo", content: "Ustawienia hasła" },
  { id: "notifications", label: "Powiadomienia", content: "Kanały powiadomień" },
] as const;

export function SettingsTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section>
      <div>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[selectedIndex].content}</div>
    </section>
  );
}
