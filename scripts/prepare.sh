echo "Load current nvm dir..."
CURRENT_NVM_DIR="${NVM_DIR}"
echo "Current nvm dir: ${CURRENT_NVM_DIR}, load nvm..."
[ -s "$CURRENT_NVM_DIR/nvm.sh" ] && \. "$CURRENT_NVM_DIR/nvm.sh"  # 加载 nvm
# if [ -z "$NVM_DIR" ]; then
#   echo "nvm not found"
# else
#   nvm use 16.15.1
# fi
nvm use 21.1.0
npm install