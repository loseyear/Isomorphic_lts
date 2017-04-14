import { receive } from './../client/actions/async';

// todo...
export default (ctx, next, store) => {
    switch (ctx.path) {
        case '/async':
            store.dispatch(receive(ctx.state.id, ctx.state.async));
            break;
        case '/count':
        default:
            break;

    }
};

