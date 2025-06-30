export default {
  editor: {
    label: {
      en: "shadcn Input",
      fr: "Champ de saisie shadcn"
    },
    icon: 'fas fa-edit',
    bubble: {
      icon: 'fas fa-edit'
    },
    deprecated: false
  },
  triggerEvents: [
    {
      name: "change",
      label: { 
        en: "On change", 
        fr: "Au changement" 
      },
      event: { value: "" },
      default: true
    },
    {
      name: "focus",
      label: { 
        en: "On focus", 
        fr: "À la mise au point" 
      },
      event: { value: "" }
    },
    {
      name: "blur",
      label: { 
        en: "On blur", 
        fr: "À la perte de focus" 
      },
      event: { value: "" }
    }
  ],
  properties: {
    type: {
      label: {
        en: "Input type",
        fr: "Type de champ"
      },
      type: "TextSelect",
      options: {
        options: [
          { value: "text", label: { en: "Text", fr: "Texte" } },
          { value: "email", label: { en: "Email", fr: "Email" } },
          { value: "password", label: { en: "Password", fr: "Mot de passe" } },
          { value: "number", label: { en: "Number", fr: "Nombre" } },
          { value: "tel", label: { en: "Phone", fr: "Téléphone" } },
          { value: "url", label: { en: "URL", fr: "URL" } },
          { value: "search", label: { en: "Search", fr: "Recherche" } },
          { value: "date", label: { en: "Date", fr: "Date" } },
          { value: "time", label: { en: "Time", fr: "Heure" } },
          { value: "datetime-local", label: { en: "DateTime", fr: "Date et heure" } }
        ]
      },
      defaultValue: "text",
      section: "settings"
    },
    placeholder: {
      label: {
        en: "Placeholder",
        fr: "Texte indicatif"
      },
      type: "Text",
      defaultValue: "",
      bindable: true,
      translatable: true,
      section: "settings"
    },
    label: {
      label: {
        en: "Label",
        fr: "Libellé"
      },
      type: "Text",
      defaultValue: "",
      bindable: true,
      translatable: true,
      section: "settings"
    },
    helpText: {
      label: {
        en: "Help text",
        fr: "Texte d'aide"
      },
      type: "Text",
      defaultValue: "",
      bindable: true,
      translatable: true,
      section: "settings"
    },
    required: {
      label: {
        en: "Required",
        fr: "Obligatoire"
      },
      type: "OnOff",
      defaultValue: false,
      bindable: true,
      section: "validation"
    },
    disabled: {
      label: {
        en: "Disabled",
        fr: "Désactivé"
      },
      type: "OnOff",
      defaultValue: false,
      bindable: true,
      section: "settings"
    },
    readonly: {
      label: {
        en: "Read only",
        fr: "Lecture seule"
      },
      type: "OnOff",
      defaultValue: false,
      bindable: true,
      section: "settings"
    },
    min: {
      label: {
        en: "Minimum value",
        fr: "Valeur minimale"
      },
      type: "Number",
      bindable: true,
      hidden: content => !['number', 'range', 'date', 'datetime-local', 'time'].includes(content.type),
      section: "validation"
    },
    max: {
      label: {
        en: "Maximum value",
        fr: "Valeur maximale"
      },
      type: "Number",
      bindable: true,
      hidden: content => !['number', 'range', 'date', 'datetime-local', 'time'].includes(content.type),
      section: "validation"
    },
    step: {
      label: {
        en: "Step",
        fr: "Pas"
      },
      type: "Number",
      bindable: true,
      hidden: content => !['number', 'range'].includes(content.type),
      section: "validation"
    },
    pattern: {
      label: {
        en: "Pattern (regex)",
        fr: "Motif (regex)"
      },
      type: "Text",
      bindable: true,
      section: "validation"
    },
    autocomplete: {
      label: {
        en: "Autocomplete",
        fr: "Autocomplétion"
      },
      type: "TextSelect",
      options: {
        options: [
          { value: "", label: { en: "None", fr: "Aucune" } },
          { value: "name", label: { en: "Name", fr: "Nom" } },
          { value: "email", label: { en: "Email", fr: "Email" } },
          { value: "username", label: { en: "Username", fr: "Nom d'utilisateur" } },
          { value: "current-password", label: { en: "Current Password", fr: "Mot de passe actuel" } },
          { value: "new-password", label: { en: "New Password", fr: "Nouveau mot de passe" } },
          { value: "tel", label: { en: "Phone", fr: "Téléphone" } },
          { value: "address-line1", label: { en: "Address", fr: "Adresse" } }
        ]
      },
      defaultValue: "",
      section: "settings"
    },
    leftIcon: {
      label: {
        en: "Left icon",
        fr: "Icône à gauche"
      },
      type: "Icon",
      bindable: true,
      section: "icons"
    },
    rightIcon: {
      label: {
        en: "Right icon",
        fr: "Icône à droite"
      },
      type: "Icon",
      bindable: true,
      section: "icons"
    },
    showPasswordToggle: {
      label: {
        en: "Show password toggle",
        fr: "Afficher le bouton de mot de passe"
      },
      type: "OnOff",
      defaultValue: true,
      hidden: content => content.type !== 'password',
      section: "settings"
    },
    errorMessage: {
      label: {
        en: "Error message",
        fr: "Message d'erreur"
      },
      type: "Text",
      defaultValue: "",
      bindable: true,
      translatable: true,
      section: "validation"
    },
    hasError: {
      label: {
        en: "Has error",
        fr: "A une erreur"
      },
      type: "OnOff",
      defaultValue: false,
      bindable: true,
      section: "validation"
    },
    wewebVariable: {
      label: {
        en: "Bind to variable",
        fr: "Lier à une variable"
      },
      type: "Text",
      bindable: true,
      section: "data"
    },
    changeWorkflowId: {
      label: {
        en: "Change workflow",
        fr: "Workflow de changement"
      },
      type: "Text",
      bindable: true,
      section: "data"
    },
    customClasses: {
      label: {
        en: "Custom CSS classes",
        fr: "Classes CSS personnalisées"
      },
      type: "Text",
      bindable: true,
      section: "style"
    }
  },
  sections: {
    settings: {
      label: { en: "Input Settings", fr: "Paramètres du champ" },
      expand: true
    },
    validation: {
      label: { en: "Validation", fr: "Validation" },
      expand: false
    },
    icons: {
      label: { en: "Icons", fr: "Icônes" },
      expand: false
    },
    data: {
      label: { en: "Data Binding", fr: "Liaison de données" },
      expand: false
    },
    style: {
      label: { en: "Style", fr: "Style" },
      expand: false
    }
  }
}; 