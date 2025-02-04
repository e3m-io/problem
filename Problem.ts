export class Problem<Type extends string> {
  readonly type: Type;
  readonly title: string;
  readonly detail: string | undefined;

  constructor(type: Type, title: string, detail?: string) {
    this.type = type;
    this.title = title;
    this.detail = detail;
  }

  toError() {
    return new Error(this.title, { cause: this });
  }

  toJSON() {
    return JSON.stringify({
      type: this.type,
      title: this.title,
      ...(this.detail && { detail: this.detail }),
    });
  }

  static fromObject({
    type,
    title,
    detail,
  }: {
    type: string;
    title: string;
    detail?: string;
  }) {
    return new Problem(type, title, detail);
  }

  static fromJSON(s: string) {
    return Problem.fromObject(JSON.parse(s));
  }
}
