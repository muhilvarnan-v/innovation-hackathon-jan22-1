package io.beckn;

import io.beckn.proto.InlineObject;
import io.beckn.proto.InlineObjectPartial;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static java.lang.System.out;

public class Example {

    public static void main(String[] args) throws IOException {

        final InlineObject.Context context = InlineObject.Context.newBuilder()
                .setAction(InlineObject.Context.ActionEnum.SEARCH)
                .setCity("Pune")
                .setCountry("India")
                .setBapUnderscoreid("BAP.id.1")
                .setDomain("")
                .build();
        final InlineObject.SearchMessage searchMessage = InlineObject.SearchMessage.newBuilder()
                .setIntent(InlineObject.SearchMessage.Intent.newBuilder()
                        .setDescriptorObj(InlineObject.SearchMessage.Intent.DescriptorObj.newBuilder().setCode("abcd").build())
                        .setProvider(InlineObject.SearchMessage.Intent.Provider.newBuilder().setId("provider.id.1").build())
                        .build())
                .build();

        final InlineObject inlineObject = InlineObject.newBuilder()
                .setContext(context)
                .setMessage(searchMessage)
                .build();

        //Serialize payload for now to file
        inlineObject.writeTo(Files.newOutputStream(Path.of("searchRequest.payload")));

        //Read serialized payload from file and compare it with original
        InlineObject deserializedInlineObject = InlineObject.parseFrom(Files.newInputStream(Path.of("searchRequest.payload")));

        out.println(inlineObject.equals(deserializedInlineObject));
        out.println("inlineObject:"+inlineObject.toString());
        out.println("deserializedInlineObject:"+deserializedInlineObject.toString());

        //Deserialize partial message
        InlineObjectPartial inlineObjectPartial =
                InlineObjectPartial.parseFrom(Files.newInputStream(Path.of("searchRequest.payload")));
        out.println("inlineObjectPartial ----------------------\n"+inlineObjectPartial.toString());
    }
}
