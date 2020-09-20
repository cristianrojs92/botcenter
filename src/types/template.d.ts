declare namespace templates {

  export const enum templateEvent  {
    MAIN = "MAIN",
    RANDOM = "RANDOM"
  }
  
  export const  enum templateType {
    MENU = "MENU",
    SUPPORT = "SUPPORT",
    INFO = "INFO"
  }
}

type templateOption = {
  value: string;
  message: string;
  templateId: string;
}

type templateDefault = {
  templateId: string;
}

type template = {
  id: string;
  name: string;
  event: templates.templateEvent;
  type: templates.templateType;
  message: string;
  options: Array<templateOption>;
  templateDefault:  templateDefault;
}