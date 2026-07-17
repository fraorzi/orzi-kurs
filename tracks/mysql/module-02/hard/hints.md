## Hint 1

Typing RowDataPacket nie zastępuje placeholderów ani walidacji domenowej.

## Hint 2

SELECT ... FOR UPDATE, inserty i stock update muszą używać jednego PoolConnection.

## Hint 3

Retry obejmuje begin→cały work→commit; obserwuj outcome i zawsze release w finally.
