import { BaseEntity } from "data-source";
import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { generateEntityId } from "utils/functions";

@Entity({ name: "brand" })
@Index(["created_at"])
// CREATE INDEX idx_brand_name ON public.brand USING GIN (fn_text_to_char_array(name));
export class Brand extends BaseEntity {
  @Column({ type: "character varying", nullable: false })
  name?: string;

  @Column({ type: "character varying", nullable: true })
  thumbnail?: string;

  @Column({ type: "character varying", nullable: true })
  description?: string;

  @Column({ type: "jsonb", default: {} })
  metadata?: Record<string, unknown> | null;

  @BeforeInsert()
  protected async BeforeInsert(): Promise<void> {
    this.id = generateEntityId(this.id, "bra");
  }
}
