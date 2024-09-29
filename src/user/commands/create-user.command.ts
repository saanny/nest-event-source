export class CreateUserCommand {
  constructor(public readonly userId: string, public readonly name: string) {}
}
