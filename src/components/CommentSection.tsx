import { adaptive } from "@toss/tds-colors";
import {
  Button,
  ConfirmDialog,
  List,
  ListHeader,
  ListRow,
  Paragraph,
  TextArea,
  TextButton,
} from "@toss/tds-mobile";
import { useState } from "react";
import { useComments } from "../hooks/useComments.ts";

type Props = {
  postId: string;
  userKey: string | null;
};

export function CommentSection({ postId, userKey }: Props) {
  const { comments, busy, add, remove } = useComments(postId, userKey);
  const [draft, setDraft] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const submit = () => {
    const value = draft.trim();
    if (!value) {
      return;
    }
    void add(value).then(() => setDraft(""));
  };

  return (
    <div style={{ paddingBottom: 24 }}>
      <ListHeader
        title={
          <ListHeader.TitleParagraph color={adaptive.grey800}>
            댓글 {comments.length}
          </ListHeader.TitleParagraph>
        }
        description={
          <ListHeader.DescriptionParagraph>
            이 기기에서만 저장됩니다. 서버 공유는 아직 없습니다.
          </ListHeader.DescriptionParagraph>
        }
        descriptionPosition="bottom"
      />

      <div style={{ padding: "0 20px 12px" }}>
        <TextArea
          variant="box"
          label="댓글"
          placeholder="생각을 남겨 주세요"
          value={draft}
          minHeight={88}
          onChange={(event) => setDraft(event.target.value)}
        />
        <div style={{ height: 10 }} />
        <Button
          size="medium"
          display="block"
          disabled={!userKey || busy || draft.trim().length === 0}
          onClick={submit}
        >
          등록
        </Button>
      </div>

      {comments.length === 0 ? (
        <div style={{ padding: "8px 24px 24px" }}>
          <Paragraph.Text typography="t6" color={adaptive.grey500}>
            아직 댓글이 없습니다.
          </Paragraph.Text>
        </div>
      ) : (
        <List>
          {comments.map((comment) => {
            const mine = comment.userKey === userKey;
            const time = formatTime(comment.createdAt);
            return (
              <ListRow
                key={comment.id}
                verticalPadding="large"
                contents={
                  <ListRow.Texts
                    type="3RowTypeC"
                    top={mine ? "나" : "익명"}
                    middle={comment.body}
                    bottom={time}
                  />
                }
                right={
                  mine ? (
                    <TextButton
                      size="small"
                      variant="underline"
                      onClick={() => setPendingDelete(comment.id)}
                    >
                      삭제
                    </TextButton>
                  ) : undefined
                }
              />
            );
          })}
        </List>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="댓글을 삭제할까요?"
        description="삭제하면 이 기기에서도 사라집니다."
        onClose={() => setPendingDelete(null)}
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => setPendingDelete(null)}>
            취소
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton
            onClick={() => {
              if (pendingDelete) {
                void remove(pendingDelete);
              }
              setPendingDelete(null);
            }}
          >
            삭제
          </ConfirmDialog.ConfirmButton>
        }
      />
    </div>
  );
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
