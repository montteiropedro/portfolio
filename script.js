const experiences = {
  current: {
    title: "Desenvolvedor de Software Pleno II",
    company: "Vortigo Digital",
    date: "06/2025 — 08/2026",
    bullets: [
      "Mantive minha atuação no projeto Saúde Simples, na OM30, após a transição da operação da Rebase para a Vortigo Digital, garantindo a continuidade das entregas e a preservação do conhecimento do produto.",
      "Atuei na manutenção e evolução de aplicações Ruby on Rails, investigando, diagnosticando e corrigindo problemas identificados nos ambientes de homologação e produção.",
      "Contribuí para reduzir significativamente os chamados relacionados a bugs por meio da análise proativa e da resolução ágil de defeitos.",
      "Realizei manutenção e ajustes em relatórios do JasperServer, incluindo alterações de layout, correções visuais e adequações de consultas para atender às necessidades do negócio.",
    ],
    skills: [
      "Ruby",
      "Ruby on Rails",
      "JavaScript",
      "CoffeeScript",
      "JQuery",
      "Haml",
      "Vue",
      "PostgreSQL",
      "Docker",
      "JasperServer",
    ],
  },
  previous: {
    title: "Desenvolvedor",
    company: "Rebase",
    date: "09/2023 — 05/2025",
    bullets: [
      "Desenvolvi um sistema interno de agendamento de visitas ao escritório com Phoenix, simplificando o gerenciamento de visitas ao ambiente físico da empresa.",
      "Participei de uma iniciativa interna de desenvolvimento de design systems, com foco no uso de tecnologias como Storybook e React.",
      "Contribuí para o desenvolvimento de uma gem Ruby interna que abstraía a API do WhatsApp Business.",
      "Passei a integrar o time Saúde Simples, na OM30, contribuindo para a manutenção e evolução de aplicações Ruby on Rails voltadas à saúde pública em um ambiente colaborativo e ágil.",
    ],
    skills: [
      "Ruby",
      "Ruby on Rails",
      "Elixir",
      "Phoenix",
      "JavaScript",
      "TypeScript",
      "React",
      "PostgreSQL",
      "Docker",
    ],
  },
};

const tabs = [...document.querySelectorAll(".experience-tab")];
const panel = document.querySelector("#experience-panel");

function showExperience(key, moveFocus = false) {
  const experience = experiences[key];
  const activeTab = tabs.find((tab) => tab.dataset.experience === key);
  if (!experience || !activeTab) return;

  tabs.forEach((tab) => {
    const selected = tab === activeTab;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  panel.setAttribute("aria-labelledby", activeTab.id);
  panel.querySelector("h2").innerHTML =
    `${experience.title} <span>@ ${experience.company}</span>`;
  panel.querySelector(".experience-date").textContent = experience.date;

  const list = panel.querySelector(".detail-list");
  list.replaceChildren(
    ...experience.bullets.map((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      return item;
    }),
  );

  const tagList = panel.querySelector(".tag-list");
  tagList.replaceChildren(
    ...experience.skills.map((text) => {
      const tag = document.createElement("span");
      tag.textContent = text;
      return tag;
    }),
  );

  if (moveFocus) activeTab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => showExperience(tab.dataset.experience));
  tab.addEventListener("keydown", (event) => {
    if (
      ![
        "ArrowDown",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
      ].includes(event.key)
    )
      return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    showExperience(tabs[nextIndex].dataset.experience, true);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
