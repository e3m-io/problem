export class Problem<
  Type extends string,
  Title extends string,
  Detail extends string | undefined = undefined,
  Meta extends Record<string, any> | undefined = undefined
> {
  readonly type: Type;
  readonly title: Title;
  readonly detail: Detail;
  readonly meta: Meta;

  constructor({
    type,
    title,
    detail,
    meta,
  }: {
    type: Type;
    title: Title;
    detail?: Detail;
    meta?: Meta;
  }) {
    this.type = type;
    this.title = title;
    this.detail = detail as Detail;
    this.meta = meta as Meta;
  }

  toError() {
    return new Error(this.title, { cause: this });
  }

  toJSON() {
    return JSON.stringify({
      type: this.type,
      title: this.title,
      ...(this.detail && { detail: this.detail }),
      ...(this.meta && { meta: this.meta }),
    });
  }
}
