export class Problem<Type extends string> {
  readonly type: Type;
  readonly title: string;
  readonly detail: string | undefined;

  constructor({
    type,
    title,
    detail,
  }: {
    type: Type;
    title: string;
    detail?: string;
  }) {
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
}
