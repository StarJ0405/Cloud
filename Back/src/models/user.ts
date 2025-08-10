import { BaseEntity } from "data-source";
import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import { generateEntityId } from "utils/functions";
import { AccountLink } from "./account_link";

export enum UserRole {
  ADMIN = "admin",
  VENDOR = "vendor",
  MEMBER = "member",
  DEVELOPER = "developer",
}

@Entity({ name: "user" })
@Index(["created_at"])
// CREATE INDEX idx_user_id ON public.user USING GIN (fn_text_to_char_array(id));
// CREATE INDEX idx_user_username ON public.user USING GIN (fn_text_to_char_array(username));
// CREATE INDEX idx_user_name ON public.user USING GIN (fn_text_to_char_array(name));
// CREATE INDEX idx_user_nickname ON public.user USING GIN (fn_text_to_char_array(nickname));
export class User extends BaseEntity {
  @Column({ type: "character varying", unique: true })
  username?: string;

  @Column({ type: "character varying" })
  password_hash?: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.MEMBER })
  role?: UserRole;

  @Column({ type: "character varying", nullable: true })
  name?: string;

  @Column({ type: "character varying", nullable: true })
  phone?: string;

  @Column({ type: "character varying", nullable: true })
  thumbnail?: string;

  @Column({ type: "timestamp with time zone", nullable: true })
  birthday?: string;

  @Column({ type: "jsonb", default: {} })
  metadata?: Record<string, unknown> | null;

  @OneToMany(() => AccountLink, (link) => link.user)
  accounts?: AccountLink[];

  @BeforeInsert()
  protected BeforeInsert(): void {
    this.id = generateEntityId(this.id, "usr");
  }
}
