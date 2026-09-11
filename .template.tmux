#!/usr/bin/env bash

### [for tmux-template check, do not remove]
### template.id="vnphanquang"
### [use the id value consistently throughout the script]

main() {
	local workdir="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"
	local session="vnphanquang"
	local win_code="󱥇 editor"
	local win_terms=" terminals"

	if ! tmux has-session -t "$session" 2>/dev/null; then
		# create session and first window for code editor
		tmux new-session -d -n "$win_code" -s "$session" -c "$workdir"
		tmux send-keys -t "$session:$win_code" "clear" Enter
		tmux send-keys -t "$session:$win_code" "nvim . "

		# create second window for terminals
		tmux new-window -n "$win_terms" -c "$workdir"
		tmux send-keys -t "$session:$win_terms.1" "clear" Enter

		tmux split-window -h -t "$session:$win_terms.1" -c "$workdir/sites/vnphanquang.com"
		tmux send-keys -t "$session:$win_terms.2" "clear" Enter

		tmux select-window -t "$session:$win_code"
	fi

	tmux -2u attach -d -t "$session"
}

main

